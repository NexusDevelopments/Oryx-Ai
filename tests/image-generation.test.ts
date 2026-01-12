import { ImageGenerationModule } from '../src/modules/image-generation';

describe('ImageGenerationModule', () => {
  let imageModule: ImageGenerationModule;

  beforeEach(() => {
    imageModule = new ImageGenerationModule();
  });

  test('should have correct name and description', () => {
    expect(imageModule.name).toBe('Image Generation');
    expect(imageModule.description).toBeDefined();
  });

  test('should initialize successfully', async () => {
    await expect(imageModule.initialize()).resolves.not.toThrow();
  });

  test('should generate image with prompt', async () => {
    await imageModule.initialize();
    const result = await imageModule.process({
      prompt: 'A beautiful sunset'
    });

    expect(result).toBeDefined();
    expect(result.imageId).toBeDefined();
    expect(result.prompt).toBe('A beautiful sunset');
    expect(result.url).toBeDefined();
    expect(result.status).toBe('generated');
  });

  test('should use default style and dimensions', async () => {
    const result = await imageModule.process({
      prompt: 'Test image'
    });

    expect(result.style).toBe('default');
    expect(result.dimensions).toEqual({ width: 1024, height: 1024 });
  });

  test('should accept custom style and dimensions', async () => {
    const result = await imageModule.process({
      prompt: 'Custom image',
      style: 'artistic',
      dimensions: { width: 1920, height: 1080 }
    });

    expect(result.style).toBe('artistic');
    expect(result.dimensions).toEqual({ width: 1920, height: 1080 });
  });
});
