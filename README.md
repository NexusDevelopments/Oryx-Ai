# Oryx - Unified Intelligence Platform

Oryx is a unified intelligence platform that combines chat, image generation, video creation, data analysis, and coding into a single system. It replaces the need for multiple tools by handling research, content creation, visuals, and development in one place. Oryx adapts to your goals and delivers results across text, images, video, and code.

## Features

### 🤖 Chat
Conversational AI interface for natural language interactions. Oryx provides intelligent responses, maintains context, and adapts to your communication style.

### 🎨 Image Generation
AI-powered image creation from text descriptions. Generate high-quality visuals with customizable styles and dimensions.

### 🎬 Video Creation
Generate and edit videos programmatically. Create professional videos from scripts, images, and specifications.

### 📊 Data Analysis
Process, analyze, and extract insights from data. Perform statistical analysis, create visualizations, and generate predictions.

### 💻 Coding
Development assistance including code generation, analysis, debugging, refactoring, and explanation. Support for multiple programming languages.

## Installation

```bash
npm install oryx-ai
```

Or clone and build from source:

```bash
git clone https://github.com/NexusDevelopments/Oryx-Ai.git
cd Oryx-Ai
npm install
npm run build
```

## Usage

### Basic Example

```typescript
import { Oryx, RequestType } from 'oryx-ai';

// Create and initialize Oryx
const oryx = new Oryx();
await oryx.initialize();

// Use chat
const chatResponse = await oryx.process({
  type: RequestType.CHAT,
  payload: {
    message: 'Hello, Oryx!',
    context: {}
  }
});

// Generate an image
const imageResponse = await oryx.process({
  type: RequestType.IMAGE_GENERATION,
  payload: {
    prompt: 'A beautiful sunset over mountains',
    style: 'realistic',
    dimensions: { width: 1920, height: 1080 }
  }
});

// Analyze data
const analysisResponse = await oryx.process({
  type: RequestType.DATA_ANALYSIS,
  payload: {
    data: [1, 2, 3, 4, 5],
    operation: 'summarize'
  }
});
```

### Chat Module

```typescript
const response = await oryx.process({
  type: RequestType.CHAT,
  payload: {
    message: 'What can you help me with?',
    context: { sessionId: 'user-123' }
  }
});
```

### Image Generation Module

```typescript
const response = await oryx.process({
  type: RequestType.IMAGE_GENERATION,
  payload: {
    prompt: 'A futuristic cityscape at night',
    style: 'cyberpunk',
    dimensions: { width: 2048, height: 1024 }
  }
});
```

### Video Creation Module

```typescript
const response = await oryx.process({
  type: RequestType.VIDEO_CREATION,
  payload: {
    script: 'Welcome to our product demonstration',
    duration: 30,
    style: 'professional'
  }
});
```

### Data Analysis Module

```typescript
const response = await oryx.process({
  type: RequestType.DATA_ANALYSIS,
  payload: {
    data: [/* your data */],
    operation: 'analyze', // 'summarize', 'visualize', 'predict', 'analyze'
    parameters: { chartType: 'line' }
  }
});
```

### Coding Module

```typescript
const response = await oryx.process({
  type: RequestType.CODING,
  payload: {
    task: 'generate', // 'generate', 'analyze', 'debug', 'refactor', 'explain'
    language: 'python',
    description: 'Create a function to sort an array'
  }
});
```

## Development

### Build

```bash
npm run build
```

### Run Demo

```bash
npm run dev
```

This will run a demonstration of all Oryx capabilities.

### Run Tests

```bash
npm test
```

## Architecture

Oryx is built with a modular architecture where each capability is implemented as a separate module:

- **ChatModule**: Handles conversational AI
- **ImageGenerationModule**: Manages image creation
- **VideoCreationModule**: Controls video generation
- **DataAnalysisModule**: Processes and analyzes data
- **CodingModule**: Provides development assistance

All modules implement the `OryxModule` interface and are orchestrated by the main `Oryx` class, which provides a unified API for accessing all capabilities.

## API Reference

### Oryx Class

#### `initialize(): Promise<void>`
Initializes all modules. Must be called before processing requests.

#### `process(request: OryxRequest): Promise<OryxResponse>`
Processes a request through the appropriate module.

#### `getCapabilities(): Array<Capability>`
Returns information about all available modules and their capabilities.

#### `isInitialized(): boolean`
Checks if the platform has been initialized.

### Request Types

- `RequestType.CHAT` - Chat interactions
- `RequestType.IMAGE_GENERATION` - Image generation
- `RequestType.VIDEO_CREATION` - Video creation
- `RequestType.DATA_ANALYSIS` - Data analysis
- `RequestType.CODING` - Coding assistance

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or contributions, please visit our [GitHub repository](https://github.com/NexusDevelopments/Oryx-Ai).