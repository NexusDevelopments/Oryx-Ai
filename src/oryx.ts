import { OryxModule, OryxRequest, OryxResponse, RequestType } from './types';
import { ChatModule } from './modules/chat';
import { ImageGenerationModule } from './modules/image-generation';
import { VideoCreationModule } from './modules/video-creation';
import { DataAnalysisModule } from './modules/data-analysis';
import { CodingModule } from './modules/coding';

/**
 * Oryx - Unified Intelligence Platform
 * 
 * A unified intelligence platform that combines chat, image generation,
 * video creation, data analysis, and coding into a single system.
 */
export class Oryx {
  private modules: Map<RequestType, OryxModule> = new Map();
  private initialized = false;

  constructor() {
    // Register all modules
    this.registerModule(RequestType.CHAT, new ChatModule());
    this.registerModule(RequestType.IMAGE_GENERATION, new ImageGenerationModule());
    this.registerModule(RequestType.VIDEO_CREATION, new VideoCreationModule());
    this.registerModule(RequestType.DATA_ANALYSIS, new DataAnalysisModule());
    this.registerModule(RequestType.CODING, new CodingModule());
  }

  /**
   * Register a module for a specific request type
   */
  private registerModule(type: RequestType, module: OryxModule): void {
    this.modules.set(type, module);
  }

  /**
   * Initialize all modules
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    console.log('Initializing Oryx Unified Intelligence Platform...');
    
    for (const [type, module] of this.modules.entries()) {
      await module.initialize();
    }

    this.initialized = true;
    console.log('Oryx platform initialized successfully!');
  }

  /**
   * Process a request through the appropriate module
   */
  async process(request: OryxRequest): Promise<OryxResponse> {
    if (!this.initialized) {
      await this.initialize();
    }

    const module = this.modules.get(request.type);
    
    if (!module) {
      return {
        success: false,
        type: request.type,
        data: null,
        error: `No module registered for request type: ${request.type}`
      };
    }

    try {
      const data = await module.process(request.payload);
      
      return {
        success: true,
        type: request.type,
        data,
        metadata: request.metadata
      };
    } catch (error) {
      return {
        success: false,
        type: request.type,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        metadata: request.metadata
      };
    }
  }

  /**
   * Get information about available modules
   */
  getCapabilities(): Array<{ type: RequestType; name: string; description: string }> {
    return Array.from(this.modules.entries()).map(([type, module]) => ({
      type,
      name: module.name,
      description: module.description
    }));
  }

  /**
   * Check if platform is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

export default Oryx;
