interface University {
  name: string;
  country: string;
  alpha_two_code: string;
  "state-province": string;
  domains: string[];
  web_pages: string[];
}

class UniversityService {
  private universities: University[] = [];
  private isLoading = false;
  private loadPromise: Promise<University[]> | null = null;
  private readonly cacheKey = 'campus_connect_universities';
  private readonly cacheVersion = 'v1';

  constructor() {
    // Start preloading immediately when service is created
    this.preloadUniversities();
  }

  private async preloadUniversities(): Promise<University[]> {
    if (this.universities.length > 0) {
      return this.universities;
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.isLoading = true;
    this.loadPromise = this.loadUniversitiesFromSource();
    
    try {
      this.universities = await this.loadPromise;
      this.isLoading = false;
      return this.universities;
    } catch (error) {
      this.isLoading = false;
      this.loadPromise = null;
      throw error;
    }
  }

  private async loadUniversitiesFromSource(): Promise<University[]> {
    // Try to get from cache first
    try {
      const cached = this.getFromCache();
      if (cached) {
        console.log('📚 Loaded universities from cache');
        return cached;
      }
    } catch (error) {
      console.warn('Cache read failed, loading from network');
    }

    // Load from network
    console.log('🌐 Loading universities from network...');
    const response = await fetch('/universities.json');
    if (!response.ok) {
      throw new Error(`Failed to load universities: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache the data
    this.saveToCache(data);
    console.log(`✅ Loaded ${data.length} universities and cached them`);
    
    return data;
  }

  private getFromCache(): University[] | null {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const parsedCache = JSON.parse(cached);
      
      // Check cache version
      if (parsedCache.version !== this.cacheVersion) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }

      // Check if cache is still valid (24 hours)
      const now = Date.now();
      const cacheAge = now - parsedCache.timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (cacheAge > maxAge) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }

      return parsedCache.data;
    } catch (error) {
      console.warn('Cache parsing failed:', error);
      return null;
    }
  }

  private saveToCache(data: University[]): void {
    try {
      const cacheData = {
        version: this.cacheVersion,
        timestamp: Date.now(),
        data: data
      };
      
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save to cache:', error);
    }
  }

  public async searchUniversities(query: string): Promise<University[]> {
    if (query.length < 2) {
      return [];
    }

    // Ensure universities are loaded
    await this.preloadUniversities();

    const normalizedQuery = query.toLowerCase().trim();
    
    return this.universities.filter(uni => 
      uni.name.toLowerCase().includes(normalizedQuery) ||
      uni.country.toLowerCase().includes(normalizedQuery)
    ).slice(0, 8); // Return top 8 matches
  }

  public async getAllUniversities(): Promise<University[]> {
    return await this.preloadUniversities();
  }

  public isLoadingUniversities(): boolean {
    return this.isLoading;
  }

  public getLoadedCount(): number {
    return this.universities.length;
  }

  // Clear cache manually if needed
  public clearCache(): void {
    localStorage.removeItem(this.cacheKey);
    this.universities = [];
    this.loadPromise = null;
  }
}

// Export singleton instance
export const universityService = new UniversityService();
export type { University };
