/**
 * Base interface for all Oryx modules
 */
export interface OryxModule {
  name: string;
  description: string;
  initialize(): Promise<void>;
  process(input: any): Promise<any>;
}

/**
 * Request types supported by Oryx
 */
export enum RequestType {
  CHAT = 'chat',
  IMAGE_GENERATION = 'image_generation',
  VIDEO_CREATION = 'video_creation',
  DATA_ANALYSIS = 'data_analysis',
  CODING = 'coding'
}

/**
 * Unified request interface
 */
export interface OryxRequest {
  type: RequestType;
  payload: any;
  metadata?: Record<string, any>;
}

/**
 * Unified response interface
 */
export interface OryxResponse {
  success: boolean;
  type: RequestType;
  data: any;
  metadata?: Record<string, any>;
  error?: string;
}
