export class DevHubMonitorError extends Error {}

export class UserAlreadyExistsError extends DevHubMonitorError {
  constructor () {
    super('User already exists');
  }
}

export class UserDoesNotExistError extends DevHubMonitorError {
  constructor () {
    DevHubMonitorError;
    super('User does not exist');
  }
}

export class InvalidPasswordError extends DevHubMonitorError {
  constructor () {
    super('Invalid password');
  }
}
export class BasicLoginFailed extends DevHubMonitorError {
  constructor () {
    super('Basic login failed');
  }
}
export class InvalidGitHubTokenError extends DevHubMonitorError {
  constructor () {
    DevHubMonitorError;
    super('Invalid Token');
  }
}
export class NoTokenYet extends DevHubMonitorError {
  constructor () {
    DevHubMonitorError;
    super('Don`t have a token');
  }
}

export class ServerGitHubError extends DevHubMonitorError {
  constructor () {
    super('Github Server Error');
  }
}
export class ServerGitHubTokenError extends DevHubMonitorError {
  constructor () {
    super('Github Server Error');
  }
}
export class NoPullRequestsFoundError extends DevHubMonitorError {
  constructor () {
    super('No pull requests found !');
  }
}
