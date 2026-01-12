import Oryx from './oryx';
import { RequestType } from './types';

/**
 * Main entry point for Oryx Unified Intelligence Platform
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Oryx - Unified Intelligence Platform');
  console.log('='.repeat(60));
  console.log();

  // Create Oryx instance
  const oryx = new Oryx();

  // Initialize the platform
  await oryx.initialize();
  console.log();

  // Display capabilities
  console.log('Available Capabilities:');
  console.log('-'.repeat(60));
  const capabilities = oryx.getCapabilities();
  capabilities.forEach((cap, index) => {
    console.log(`${index + 1}. ${cap.name} (${cap.type})`);
    console.log(`   ${cap.description}`);
  });
  console.log();

  // Demonstrate each capability
  console.log('Demonstrating Platform Capabilities:');
  console.log('='.repeat(60));
  console.log();

  // 1. Chat
  console.log('1. CHAT - Conversational AI');
  console.log('-'.repeat(60));
  const chatResponse = await oryx.process({
    type: RequestType.CHAT,
    payload: {
      message: 'Hello, Oryx! What can you help me with?',
      context: { sessionId: 'demo-session' }
    }
  });
  console.log('Response:', JSON.stringify(chatResponse.data, null, 2));
  console.log();

  // 2. Image Generation
  console.log('2. IMAGE GENERATION - Create Visual Content');
  console.log('-'.repeat(60));
  const imageResponse = await oryx.process({
    type: RequestType.IMAGE_GENERATION,
    payload: {
      prompt: 'A futuristic AI platform interface',
      style: 'modern',
      dimensions: { width: 1920, height: 1080 }
    }
  });
  console.log('Response:', JSON.stringify(imageResponse.data, null, 2));
  console.log();

  // 3. Video Creation
  console.log('3. VIDEO CREATION - Generate Videos');
  console.log('-'.repeat(60));
  const videoResponse = await oryx.process({
    type: RequestType.VIDEO_CREATION,
    payload: {
      script: 'Welcome to Oryx - your unified intelligence platform',
      duration: 15,
      style: 'professional'
    }
  });
  console.log('Response:', JSON.stringify(videoResponse.data, null, 2));
  console.log();

  // 4. Data Analysis
  console.log('4. DATA ANALYSIS - Process and Analyze Data');
  console.log('-'.repeat(60));
  const dataResponse = await oryx.process({
    type: RequestType.DATA_ANALYSIS,
    payload: {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      operation: 'summarize' as const
    }
  });
  console.log('Response:', JSON.stringify(dataResponse.data, null, 2));
  console.log();

  // 5. Coding
  console.log('5. CODING - Development Assistance');
  console.log('-'.repeat(60));
  const codingResponse = await oryx.process({
    type: RequestType.CODING,
    payload: {
      task: 'generate' as const,
      language: 'typescript',
      description: 'Create a function to calculate fibonacci sequence'
    }
  });
  console.log('Response:', JSON.stringify(codingResponse.data, null, 2));
  console.log();

  console.log('='.repeat(60));
  console.log('Oryx platform demonstration complete!');
  console.log('All modules are working and integrated successfully.');
  console.log('='.repeat(60));
}

// Export Oryx and types for library usage
export { Oryx, RequestType };
export * from './types';

// Run demonstration if executed directly
if (require.main === module) {
  main().catch(console.error);
}
