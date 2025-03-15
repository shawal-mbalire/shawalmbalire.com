import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkEntry } from '../models/workEntry';

@Injectable({
  providedIn: 'root'
})
export class WorkEntryService {
  private jsonUrl = 'assets/work-entries.json';

  constructor(private http: HttpClient) {}

  getWorkEntries(): Observable<WorkEntry[]> {
    return this.http.get<WorkEntry[]>(this.jsonUrl);
  }
}
