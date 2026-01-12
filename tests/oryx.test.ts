import Oryx from '../src/oryx';
import { RequestType } from '../src/types';

describe('Oryx Platform', () => {
  let oryx: Oryx;

  beforeEach(() => {
    oryx = new Oryx();
  });

  describe('Initialization', () => {
    test('should create Oryx instance', () => {
      expect(oryx).toBeDefined();
      expect(oryx.isInitialized()).toBe(false);
    });

    test('should initialize successfully', async () => {
      await oryx.initialize();
      expect(oryx.isInitialized()).toBe(true);
    });

    test('should not reinitialize if already initialized', async () => {
      await oryx.initialize();
      await oryx.initialize(); // Should not throw
      expect(oryx.isInitialized()).toBe(true);
    });
  });

  describe('Capabilities', () => {
    test('should return all available capabilities', () => {
      const capabilities = oryx.getCapabilities();
      expect(capabilities).toHaveLength(5);
      
      const capabilityTypes = capabilities.map(c => c.type);
      expect(capabilityTypes).toContain(RequestType.CHAT);
      expect(capabilityTypes).toContain(RequestType.IMAGE_GENERATION);
      expect(capabilityTypes).toContain(RequestType.VIDEO_CREATION);
      expect(capabilityTypes).toContain(RequestType.DATA_ANALYSIS);
      expect(capabilityTypes).toContain(RequestType.CODING);
    });

    test('each capability should have name and description', () => {
      const capabilities = oryx.getCapabilities();
      capabilities.forEach(cap => {
        expect(cap.name).toBeDefined();
        expect(cap.description).toBeDefined();
        expect(cap.type).toBeDefined();
      });
    });
  });

  describe('Request Processing', () => {
    beforeEach(async () => {
      await oryx.initialize();
    });

    test('should process chat request', async () => {
      const response = await oryx.process({
        type: RequestType.CHAT,
        payload: {
          message: 'Hello'
        }
      });

      expect(response.success).toBe(true);
      expect(response.type).toBe(RequestType.CHAT);
      expect(response.data).toBeDefined();
      expect(response.data.reply).toBeDefined();
    });

    test('should process image generation request', async () => {
      const response = await oryx.process({
        type: RequestType.IMAGE_GENERATION,
        payload: {
          prompt: 'A beautiful landscape'
        }
      });

      expect(response.success).toBe(true);
      expect(response.type).toBe(RequestType.IMAGE_GENERATION);
      expect(response.data).toBeDefined();
      expect(response.data.imageId).toBeDefined();
      expect(response.data.url).toBeDefined();
    });

    test('should process video creation request', async () => {
      const response = await oryx.process({
        type: RequestType.VIDEO_CREATION,
        payload: {
          script: 'Test video script',
          duration: 10
        }
      });

      expect(response.success).toBe(true);
      expect(response.type).toBe(RequestType.VIDEO_CREATION);
      expect(response.data).toBeDefined();
      expect(response.data.videoId).toBeDefined();
      expect(response.data.url).toBeDefined();
    });

    test('should process data analysis request', async () => {
      const response = await oryx.process({
        type: RequestType.DATA_ANALYSIS,
        payload: {
          data: [1, 2, 3, 4, 5],
          operation: 'summarize'
        }
      });

      expect(response.success).toBe(true);
      expect(response.type).toBe(RequestType.DATA_ANALYSIS);
      expect(response.data).toBeDefined();
      expect(response.data.operation).toBe('summarize');
    });

    test('should process coding request', async () => {
      const response = await oryx.process({
        type: RequestType.CODING,
        payload: {
          task: 'generate',
          language: 'javascript'
        }
      });

      expect(response.success).toBe(true);
      expect(response.type).toBe(RequestType.CODING);
      expect(response.data).toBeDefined();
      expect(response.data.result).toBeDefined();
    });

    test('should handle invalid request type', async () => {
      const response = await oryx.process({
        type: 'invalid_type' as any,
        payload: {}
      });

      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
    });

    test('should auto-initialize if not initialized', async () => {
      const newOryx = new Oryx();
      expect(newOryx.isInitialized()).toBe(false);

      const response = await newOryx.process({
        type: RequestType.CHAT,
        payload: { message: 'Test' }
      });

      expect(newOryx.isInitialized()).toBe(true);
      expect(response.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    beforeEach(async () => {
      await oryx.initialize();
    });

    test('should handle errors gracefully', async () => {
      // This test ensures the platform handles unexpected errors
      const response = await oryx.process({
        type: RequestType.CHAT,
        payload: null // Invalid payload
      });

      // The system should handle this gracefully
      expect(response).toBeDefined();
      expect(response.type).toBe(RequestType.CHAT);
    });
  });

  describe('Metadata', () => {
    beforeEach(async () => {
      await oryx.initialize();
    });

    test('should preserve request metadata in response', async () => {
      const metadata = { userId: 'test-123', sessionId: 'session-456' };
      
      const response = await oryx.process({
        type: RequestType.CHAT,
        payload: { message: 'Test' },
        metadata
      });

      expect(response.metadata).toEqual(metadata);
    });
  });
});
