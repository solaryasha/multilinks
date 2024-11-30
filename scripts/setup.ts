import crypto from 'node:crypto';
import readline from 'node:readline';
import chalk from 'chalk';
import { WorkOS } from '@workos-inc/node';
import fs from 'fs/promises'
import path from 'node:path';


async function main () {
  const WORKOS_API_KEY = await getWorkOSSecretKey();
  const WORKOS_CLIENT_ID = await getWorkOSClientId();
  const NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';
  const NEXT_PUBLIC_WORKOS_REDIRECT_URI = `${NEXT_PUBLIC_BASE_URL}/callback`;
  const WORKOS_COOKIE_PASSWORD = generateAuthSecret();
  
  await setAuditLogSchema(WORKOS_API_KEY);
  await promptRedirectURI();
  await promptRoleCreation();

  await writeEnvFile({
    WORKOS_API_KEY,
    WORKOS_CLIENT_ID,
    NEXT_PUBLIC_WORKOS_REDIRECT_URI,
    WORKOS_COOKIE_PASSWORD,
    NEXT_PUBLIC_BASE_URL,
  });

  console.log('\n🎉 Setup completed successfully!');

  console.log('\nYou can now start the development server with: pnpm run dev');
}


main().catch(console.error)

function question(query: string): Promise<string> {
  const rlInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rlInstance.question(query, (answer) => {
      rlInstance.close();
      resolve(answer);
    })
  })
}

async function getWorkOSSecretKey() {
  console.log(`\n${chalk.bold('Getting WorkOS API Keys')}`);
  console.log(
    'You can find your WorkOS API Key in the dashboard under the "Quick start" section: https://dashboard.workos.com/get-started',
  );
  return await question('Enter your WorkOS API Key: ');
}

async function getWorkOSClientId() {
  console.log(`\n${chalk.bold('Getting WorkOS Client ID')}`);
  console.log(
    'You can find your WorkOS Client ID in the dashboard under the "Quick start" section: https://dashboard.workos.com/get-started',
  );
  return await question('Enter your WorkOS Client ID: ');
}

function generateAuthSecret(): string {
  console.log(`\n${chalk.bold('Generating WORKOS_COOKIE_PASSWORD')}`);
  return crypto.randomBytes(32).toString('hex');
}

async function setAuditLogSchema(workosApiKey: string) {
  console.log(`\n${chalk.bold('Creating audit log schema')}`);
  console.log('Creating schema for "user.logged_in" and "user.logged_out events');

  try {
    const workos = new WorkOS(workosApiKey);
    await workos.auditLogs.createSchema({
      action: 'user.logged_in',
      actor: {
        metadata: {
          role: 'string',
        },
      },
      targets: [
        {
          type: 'user',
        },
      ],
    });

    console.log(chalk.green('Created schema for "user.logged_in" event'));

    await workos.auditLogs.createSchema({
      action: 'user.logged_out',
      actor: {
        metadata: {
          role: 'string',
        },
      },
      targets: [
        {
          type: 'user',
        },
      ],
    });

    console.log(chalk.green('Created schema for "user.logged_out" event'));
  } catch (error) {
    console.log(chalk.red('Failed to create schemas for "user.logged_in" and "user.logged_out" events:'));
    console.log(error);
  }
}

async function promptRedirectURI() {
  console.log(`\n${chalk.bold('Set redirect URI in WorkOS dashboard')}`);
  console.log(
    'Set the redirect URI to: http://localhost:3000/callback in the WorkOS dashboard in the "Redirects" section',
  );
  return await question('Hit enter after you have set the redirect URI');
}

async function promptRoleCreation() {
  console.log(`\n${chalk.bold('Create roles in WorkOS')}`);
  console.log('Add the "Admin" role in the WorkOS dashboard in the "Roles" section');
  return await question('Hit enter after you have created the "Admin" role');
}

async function writeEnvFile(envVars: Record<string, string>) {
  console.log(`\n${chalk.bold('Writing environment variables to .env')}`);
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  await fs.writeFile(path.join(process.cwd(), '.env.local'), envContent);
  console.log('.env.local file created with the necessary variables.');
}