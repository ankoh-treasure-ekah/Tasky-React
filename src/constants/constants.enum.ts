export enum TaskLevel {
    COMPLETED = "COMPLETED",
    PROGRESS = "PROGRESS",
    NOT_STARTED = "NOT_STARTED"
}

export enum TaskStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    PAUSED = "PAUSED",
    PROCESSING = "PROCESSING"
}

export enum TaskDifficulty {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    STANDARD = "STANDARD"
}

export enum inputErrors {
    emailRequired= 'email required',
    passwordRequired= 'password required',
    usernameRequired= 'username required',
    invalidemail= 'invalid email',
    invalidPassword= 'Password must be a combination of lower-case, upper-case, numbers and at least 9 characters long'
}