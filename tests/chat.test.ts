import { ChatModule } from '../src/modules/chat';

describe('ChatModule', () => {
  let chatModule: ChatModule;

  beforeEach(() => {
    chatModule = new ChatModule();
  });

  test('should have correct name and description', () => {
    expect(chatModule.name).toBe('Chat');
    expect(chatModule.description).toBeDefined();
  });

  test('should initialize successfully', async () => {
    await expect(chatModule.initialize()).resolves.not.toThrow();
  });

  test('should process chat message', async () => {
    await chatModule.initialize();
    const result = await chatModule.process({
      message: 'Hello, Oryx!',
      context: {}
    });

    expect(result).toBeDefined();
    expect(result.reply).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });

  test('should include context in response', async () => {
    const context = { sessionId: 'test-123' };
    const result = await chatModule.process({
      message: 'Test message',
      context
    });

    expect(result.context).toEqual(context);
  });
});
