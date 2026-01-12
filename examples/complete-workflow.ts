/**
 * Example: Complete workflow using all Oryx capabilities
 * 
 * This example demonstrates how to use Oryx for a complete
 * content creation workflow: research, analysis, coding, and media generation
 */

import { Oryx, RequestType } from '../src/index';

async function completeWorkflow() {
  console.log('Starting Complete Oryx Workflow Demo');
  console.log('='.repeat(60));

  const oryx = new Oryx();
  await oryx.initialize();

  // Step 1: Use Chat for research and planning
  console.log('\nStep 1: Research and Planning (Chat)');
  console.log('-'.repeat(60));
  const planningResponse = await oryx.process({
    type: RequestType.CHAT,
    payload: {
      message: 'I need to create a data visualization dashboard. What should I consider?',
      context: {}
    }
  });
  console.log('Planning advice:', planningResponse.data.reply);

  // Step 2: Generate code for the dashboard
  console.log('\nStep 2: Generate Code (Coding)');
  console.log('-'.repeat(60));
  const codeResponse = await oryx.process({
    type: RequestType.CODING,
    payload: {
      task: 'generate',
      language: 'javascript',
      description: 'Create a simple dashboard component with charts'
    }
  });
  console.log('Generated code:\n', codeResponse.data.result.code);

  // Step 3: Analyze sample data
  console.log('\nStep 3: Analyze Data (Data Analysis)');
  console.log('-'.repeat(60));
  const sampleData = [
    { month: 'Jan', sales: 1200 },
    { month: 'Feb', sales: 1900 },
    { month: 'Mar', sales: 1500 },
    { month: 'Apr', sales: 2100 },
    { month: 'May', sales: 2400 }
  ];
  const analysisResponse = await oryx.process({
    type: RequestType.DATA_ANALYSIS,
    payload: {
      data: sampleData,
      operation: 'visualize',
      parameters: { chartType: 'line' }
    }
  });
  console.log('Visualization created:', analysisResponse.data.result.chartUrl);

  // Step 4: Generate promotional image
  console.log('\nStep 4: Create Promotional Image (Image Generation)');
  console.log('-'.repeat(60));
  const imageResponse = await oryx.process({
    type: RequestType.IMAGE_GENERATION,
    payload: {
      prompt: 'Professional data dashboard with charts and graphs, modern UI',
      style: 'corporate',
      dimensions: { width: 1920, height: 1080 }
    }
  });
  console.log('Image generated:', imageResponse.data.url);

  // Step 5: Create promotional video
  console.log('\nStep 5: Create Promotional Video (Video Creation)');
  console.log('-'.repeat(60));
  const videoResponse = await oryx.process({
    type: RequestType.VIDEO_CREATION,
    payload: {
      script: 'Introducing our new data analytics dashboard - visualize your data like never before',
      duration: 20,
      style: 'professional'
    }
  });
  console.log('Video created:', videoResponse.data.url);

  console.log('\n' + '='.repeat(60));
  console.log('Complete workflow finished successfully!');
  console.log('All Oryx capabilities used in a single project.');
  console.log('='.repeat(60));
}

// Run the workflow
completeWorkflow().catch(console.error);
