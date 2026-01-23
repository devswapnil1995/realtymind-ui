import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ApiResponse,
  MarketSnapshotResponse,
  PriceRentTrendsResponse,
  HeatIndexResponse,
  SupplyDemandResponse,
  MarketExplanationResponse,
  MarketComparisonPreviewResponse
} from '../../models/market.models';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MarketApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api/v1/markets`;

  constructor(private http: HttpClient) {}

  /* ---------- MARKET SNAPSHOT ---------- */
  getMarketSnapshot(
    regionId: string
  ): Observable<ApiResponse<MarketSnapshotResponse>> {
    return this.http.get<ApiResponse<MarketSnapshotResponse>>(
      `${this.baseUrl}/${regionId}/snapshot`
    );
  }

  /* ---------- PRICE & RENT TRENDS ---------- */
  getPriceRentTrends(
    regionId: string,
    months = 24
  ): Observable<ApiResponse<PriceRentTrendsResponse>> {
    return this.http.get<ApiResponse<PriceRentTrendsResponse>>(
      `${this.baseUrl}/${regionId}/price-rent-trends`,
      { params: { months } }
    );
  }

  /* ---------- HEAT INDEX ---------- */
  getHeatIndex(
    regionId: string
  ): Observable<ApiResponse<HeatIndexResponse>> {
    return this.http.get<ApiResponse<HeatIndexResponse>>(
      `${this.baseUrl}/${regionId}/heat-index`
    );
  }

  /* ---------- SUPPLY vs DEMAND ---------- */
  getSupplyDemand(
    regionId: string
  ): Observable<ApiResponse<SupplyDemandResponse>> {
    return this.http.get<ApiResponse<SupplyDemandResponse>>(
      `${this.baseUrl}/${regionId}/supply-demand`
    );
  }

  /* ---------- EXPLANATION ---------- */
  getExplanation(
    regionId: string
  ): Observable<ApiResponse<MarketExplanationResponse>> {
    return this.http.get<ApiResponse<MarketExplanationResponse>>(
      `${this.baseUrl}/${regionId}/explanation`
    );
  }

  /* ---------- COMPARISON PREVIEW ---------- */
  getComparisonPreview(
    regionId: string
  ): Observable<ApiResponse<MarketComparisonPreviewResponse>> {
    return this.http.get<ApiResponse<MarketComparisonPreviewResponse>>(
      `${this.baseUrl}/${regionId}/comparison-preview`
    );
  }
}
