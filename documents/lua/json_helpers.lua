-- JSON and helper functions for LuaLaTeX
-- Keep this file Lua-only and load it from luacode to avoid quoting issues.
local json = {}
local pos, json_text

-- forward declarations for parser functions so they can call each other
local skip_ws, parse_string, parse_number, parse_value, parse_array, parse_object

function skip_ws()
  while pos <= #json_text and json_text:sub(pos,pos):match('%s') do pos = pos + 1 end
end

parse_string = function()
  local i = pos + 1
  local res = ''
  while true do
    local ch = json_text:sub(i,i)
    if ch == '"' then pos = i + 1; return res end
    if ch == '\\' then
      local esc = json_text:sub(i+1,i+1)
      if esc == 'n' then res = res .. '\n'; i = i + 2
      elseif esc == 't' then res = res .. '\t'; i = i + 2
      elseif esc == 'r' then res = res .. '\r'; i = i + 2
      elseif esc == '"' then res = res .. '"'; i = i + 2
      elseif esc == '\\' then res = res .. '\\'; i = i + 2
      elseif esc == 'u' then
        local hex = json_text:sub(i+2,i+5)
        if hex:match('%x%x%x%x') then res = res .. '?'; i = i + 6 else res = res .. '?'; i = i + 2 end
      else res = res .. esc; i = i + 2
      end
    else
      res = res .. ch; i = i + 1
    end
    if i > #json_text then return res end
  end
end

parse_number = function()
  local s,e = json_text:match('^([-0-9%.eE]+)()', pos)
  if not s then return nil end
  pos = e
  return tonumber(s)
end

parse_value = function()
  skip_ws()
  local c = json_text:sub(pos,pos)
  if c == '"' then return parse_string()
  elseif c == '{' then return parse_object()
  elseif c == '[' then return parse_array()
  elseif c == 'n' and json_text:sub(pos,pos+3) == 'null' then pos = pos + 4; return nil
  elseif c == 't' and json_text:sub(pos,pos+3) == 'true' then pos = pos + 4; return true
  elseif c == 'f' and json_text:sub(pos,pos+4) == 'false' then pos = pos + 5; return false
  else return parse_number()
  end
end

parse_array = function()
  pos = pos + 1
  local res = {}
  skip_ws()
  if json_text:sub(pos,pos) == ']' then pos = pos + 1; return res end
  while true do
    local v = parse_value()
    table.insert(res, v)
    skip_ws()
    local c = json_text:sub(pos,pos)
    if c == ']' then pos = pos + 1; break end
    pos = pos + 1 -- skip comma
  end
  return res
end

parse_object = function()
  pos = pos + 1
  local res = {}
  skip_ws()
  if json_text:sub(pos,pos) == '}' then pos = pos + 1; return res end
  while true do
    skip_ws()
    local key = parse_string()
    skip_ws()
    pos = pos + 1 -- skip ':'
    local val = parse_value()
    res[key] = val
    skip_ws()
    local c = json_text:sub(pos,pos)
    if c == '}' then pos = pos + 1; break end
    pos = pos + 1 -- skip comma
  end
  return res
end

function json.decode(s)
  json_text = s
  pos = 1
  skip_ws()
  return parse_value()
end

local function readfile(path)
  local f = io.open(path,'r')
  if not f then tex.print('%% ERROR: could not open '..path); return nil end
  local s = f:read('*all')
  f:close()
  return s
end

local function esc(s)
  if not s then return '' end
  s = tostring(s)
  -- Extract URLs and replace with markers so we don't escape the generated \href
  local urls = {}
  -- Match URLs (avoid unescaped % in Lua patterns). Character class excludes whitespace and some delimiters.
  s = s:gsub('(https?://[^%s%]%],;]+)', function(u) return u end)
  s = s:gsub('(https?://[^%s%,;]+)', function(u)
    table.insert(urls, u)
    return '__URL' .. tostring(#urls) .. '__'
  end)
  -- Escape backslashes to \textbackslash{} (should be rare in JSON content)
  s = s:gsub('\\','\\textbackslash{}')
  -- Escape common LaTeX special characters
  s = s:gsub('([%%#%$&_{}~%^])','\\%1')
  -- Restore URLs as clickable \href{url}{url}
  for i,u in ipairs(urls) do
    s = s:gsub('__URL' .. tostring(i) .. '__', '\\href{' .. u .. '}{' .. u .. '}')
  end
  return s
end

return { json = json, readfile = readfile, esc = esc }
