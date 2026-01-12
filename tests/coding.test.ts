import { CodingModule } from '../src/modules/coding';

describe('CodingModule', () => {
  let codingModule: CodingModule;

  beforeEach(() => {
    codingModule = new CodingModule();
  });

  test('should have correct name and description', () => {
    expect(codingModule.name).toBe('Coding');
    expect(codingModule.description).toBeDefined();
  });

  test('should initialize successfully', async () => {
    await expect(codingModule.initialize()).resolves.not.toThrow();
  });

  test('should generate code', async () => {
    const result = await codingModule.process({
      task: 'generate',
      language: 'python',
      description: 'Create a hello world function'
    });

    expect(result.task).toBe('generate');
    expect(result.result.code).toBeDefined();
    expect(result.result.language).toBe('python');
  });

  test('should analyze code', async () => {
    const result = await codingModule.process({
      task: 'analyze',
      code: 'function test() { return true; }'
    });

    expect(result.task).toBe('analyze');
    expect(result.result.complexity).toBeDefined();
    expect(result.result.qualityScore).toBeDefined();
  });

  test('should debug code', async () => {
    const result = await codingModule.process({
      task: 'debug',
      code: 'console.log("test")'
    });

    expect(result.task).toBe('debug');
    expect(result.result.issues).toBeDefined();
  });

  test('should refactor code', async () => {
    const result = await codingModule.process({
      task: 'refactor',
      code: 'function old() {}'
    });

    expect(result.task).toBe('refactor');
    expect(result.result.refactoredCode).toBeDefined();
  });

  test('should explain code', async () => {
    const result = await codingModule.process({
      task: 'explain',
      code: 'const x = 5;'
    });

    expect(result.task).toBe('explain');
    expect(result.result.explanation).toBeDefined();
  });
});
