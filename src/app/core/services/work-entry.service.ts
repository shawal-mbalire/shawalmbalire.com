import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkEntry } from '../models/work-entry.model';

/**
 * Service to fetch and manage work entries
 */
@Injectable({
  providedIn: 'root'
})
export class WorkEntryService {
  private readonly jsonUrl = 'assets/work-entries.json';

  constructor(private readonly http: HttpClient) {}

  getWorkEntries(): Observable<WorkEntry[]> {
    return this.http.get<WorkEntry[]>(this.jsonUrl);
  }
}
