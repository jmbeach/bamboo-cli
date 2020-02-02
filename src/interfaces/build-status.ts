import Plan from './plan'
export default interface BuildStatus {
    expand: string;
    link: {
        href: string;
        rel: string;
    };
    plan: Plan;
    planName: string;
    projectName: string;
    buildResultKey: string;
    lifeCycleState: 'InProgress' | 'Finished';
    id: number;
    buildStartedTime: Date;
    prettyBuildStartedTime: string;
    buildDurationInSeconds: number;
    buildDuration: number;
    buildDurationDescription: string;
    buildRelativeTime: string;
    vcsRevisionKey: string;
    vcsRevisions: {
        size: number;
        startIndex: number;
        maxResult: number;
    };
    continuable: boolean;
    onceOff: boolean;
    restartable: boolean;
    notRunYet: boolean;
    finished: boolean;
    successful: boolean;
    buildReason: string;
    reasonSummary: string;
    artifacts: {
        size: number;
        startIndex: number;
        maxResult: number;
    };
    comments: {
        size: number;
        startIndex: number;
        maxResult: number;
    };
    jiraIssues: {
        size: number;
        startIndex: number;
        maxResult: number;
    };
    stages: {
        size: number;
        startIndex: number;
        maxResult: number;
    };
    changes: {
        size: number;
        startIndex: number;
        maxResult: number;
    };
    metadata: {
        size: number;
        startIndex: number;
        maxResult: number;
    };
    progress: undefined | {
        isValid: boolean;
        isUnderAverageTime: boolean;
        percentageCompleted: number;
        percentageCompletedPretty: string;
        prettyTimeRemaining: string;
        prettyTimeRemainingLong: string;
        averageBuildDuration: number;
        prettyAverageBuildDuration: string;
        buildTime: number;
        prettyBuildTime: string;
        startedTime: Date;
        startedTimeFormatted: string;
        prettyStartedTime: string;
    };
    key: string;
    planResultKey: {
        key: string;
        entityKey: {
            key: string;
        };
        resultNumber: number;
    };
    state: 'Unknown' | 'Successful' | 'Failed';
    buildState: 'Unknown' | 'Successful' | 'Failed';
    number: number;
    buildNumber: number;
}
