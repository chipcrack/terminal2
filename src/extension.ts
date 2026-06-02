import * as vscode from 'vscode';
import * as path from 'node:path';

let terminal: vscode.Terminal | undefined;
let statusBarItem: vscode.StatusBarItem;

function getTerminalName(): string {
  const config = vscode.workspace.getConfiguration('terminal2');
  return config.get<string>('terminalName') || 'Terminal2';
}

function getOrCreateTerminal(): vscode.Terminal {
  if (!terminal) {
    terminal = vscode.window.createTerminal(getTerminalName());
  }

  return terminal;
}

function getCurrentFileDirectory(): string | undefined {
  const activeEditor = vscode.window.activeTextEditor;

  if (!activeEditor) {
    return undefined;
  }

  const fileUri = activeEditor.document.uri;

  if (fileUri.scheme !== 'file') {
    return undefined;
  }

  return path.dirname(fileUri.fsPath);
}

function createStatusBarItem(context: vscode.ExtensionContext) {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  statusBarItem.command = 'terminal2.toggle';
  statusBarItem.text = '$(terminal) Terminal2';
  statusBarItem.tooltip = 'Terminal2: Mostrar terminal integrada';
  statusBarItem.show();

  context.subscriptions.push(statusBarItem);
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Terminal2 está activa.');

  createStatusBarItem(context);

  const runCommand = vscode.commands.registerCommand('terminal2.run', async () => {
    const config = vscode.workspace.getConfiguration('terminal2');

    const defaultCommand = config.get<string>('defaultCommand') || '';
    const clearBeforeRun = config.get<boolean>('clearBeforeRun') || false;

    const command = await vscode.window.showInputBox({
      title: 'Terminal2',
      prompt: 'Escribe el comando que deseas ejecutar',
      value: defaultCommand
    });

    if (!command) {
      return;
    }

    const currentTerminal = getOrCreateTerminal();
    currentTerminal.show();

    if (clearBeforeRun) {
      currentTerminal.sendText('clear');
    }

    currentTerminal.sendText(command);
  });

  const stopCommand = vscode.commands.registerCommand('terminal2.stop', () => {
    if (!terminal) {
      vscode.window.showInformationMessage('Terminal2 no tiene una terminal activa.');
      return;
    }

    terminal.dispose();
    terminal = undefined;

    vscode.window.showInformationMessage('Terminal2: terminal cerrada.');
  });

  const openCommand = vscode.commands.registerCommand('terminal2.open', (uri?: vscode.Uri) => {
    let cwd: string | undefined;

    if (uri && uri.scheme === 'file') {
      cwd = uri.fsPath;
    } else {
      cwd = getCurrentFileDirectory();
    }

    terminal = vscode.window.createTerminal({
      name: getTerminalName(),
      cwd
    });

    terminal.show();
  });

  const toggleCommand = vscode.commands.registerCommand('terminal2.toggle', () => {
    vscode.commands.executeCommand('workbench.action.terminal.toggleTerminal');
  });

  context.subscriptions.push(
    runCommand,
    stopCommand,
    openCommand,
    toggleCommand
  );
}

export function deactivate() {
  if (terminal) {
    terminal.dispose();
    terminal = undefined;
  }

  if (statusBarItem) {
    statusBarItem.dispose();
  }
}