import faker = require('faker')
import BuildStatus from '../src/interfaces/build-status'

export default class MockDataHelper {
  static getMockBuildResult(enabled: boolean, state: 'Successful' | 'Failed') {
    return {
      link: MockDataHelper.getMockLink(),
      plan: this.getMockPlan(enabled),
      buildResultKey: faker.random.alphaNumeric(10),
      lifeCycleState: 'Finished',
      id: faker.random.number(100),
      key: faker.random.alphaNumeric(20),
      planResultKey: {
        key: faker.random.alphaNumeric(20),
        entityKey: {
          key: faker.random.alphaNumeric(20),
        },
        resultNumber: faker.random.number(100),
      },
      state: state,
      buildState: state,
      number: faker.random.number(100),
      buildNumber: faker.random.number(100),
    }
  }

  static getMockBuildStatus(enabled: boolean, lifeCycleState: 'InProgress' | 'Finished', state: 'Unknown' | 'Successful' | 'Failed') {
    return {
      expand: faker.random.alphaNumeric(100),
      link: MockDataHelper.getMockLink(),
      plan: MockDataHelper.getMockPlan(enabled),
      planName: faker.random.alphaNumeric(20),
      projectName: faker.random.alphaNumeric(20),
      buildResultKey: faker.random.alphaNumeric(10),
      lifeCycleState: lifeCycleState,
      id: faker.random.number(10000),
      buildStartedTime: faker.date.recent(1),
      prettyBuildStartedTime: faker.random.alphaNumeric(20),
      buildDurationInSeconds: faker.random.number(60),
      buildDuration: faker.random.number(60),
      buildDurationDescription: faker.random.alphaNumeric(20),
      buildRelativeTime: faker.random.alphaNumeric(20),
      vcsRevisionKey: faker.random.alphaNumeric(20),
      vcsRevisions: {
        size: faker.random.number(60),
        startIndex: faker.random.number(60),
        maxResult: faker.random.number(60),
      },
      continuable: faker.random.boolean(),
      onceOff: faker.random.boolean(),
      restartable: faker.random.boolean(),
      notRunYet: faker.random.boolean(),
      finished: faker.random.boolean(),
      successful: faker.random.boolean(),
      buildReason: faker.random.alphaNumeric(20),
      reasonSummary: faker.random.alphaNumeric(20),
      artifacts: {
        size: faker.random.number(60),
        startIndex: faker.random.number(60),
        maxResult: faker.random.number(60),
      },
      comments: {
        size: faker.random.number(60),
        startIndex: faker.random.number(60),
        maxResult: faker.random.number(60),
      },
      jiraIssues: {
        size: faker.random.number(60),
        startIndex: faker.random.number(60),
        maxResult: faker.random.number(60),
      },
      stages: {
        size: faker.random.number(60),
        startIndex: faker.random.number(60),
        maxResult: faker.random.number(60),
      },
      changes: {
        size: faker.random.number(60),
        startIndex: faker.random.number(60),
        maxResult: faker.random.number(60),
      },
      metadata: {
        size: faker.random.number(60),
        startIndex: faker.random.number(60),
        maxResult: faker.random.number(60),
      },
      progress: {
        isValid: true,
        isUnderAverageTime: true,
        percentageCompleted: Math.random(),
        percentageCompletedPretty: faker.random.number(2) + '%',
        prettyTimeRemaining: faker.random.number(60) + ' secs remaining',
        prettyTimeRemainingLong: `Approximately ${faker.random.number(60)} seconds remaining`,
        averageBuildDuration: faker.random.number(100),
        prettyAverageBuildDuration: `${faker.random.number(60)} seconds`,
        buildTime: faker.random.number(100),
        prettyBuildTime: `${faker.random.number(60)} seconds`,
        startedTime: faker.date.recent(1),
        startedTimeFormatted: faker.random.alphaNumeric(20),
        prettyStartedTime: faker.random.number(60) + ' secs ago',
      },
      key: faker.random.alphaNumeric(20),
      planResultKey: {
        key: faker.random.alphaNumeric(20),
        entityKey: {
          key: faker.random.alphaNumeric(20),
        },
        resultNumber: faker.random.number(60),
      },
      state: state,
      buildState: state,
      number: faker.random.number(100),
      buildNumber: faker.random.number(60),
    } as BuildStatus
  }

  static getMockLink() {
    return {
      href: faker.random.alphaNumeric(50),
      rel: 'self',
    }
  }

  static getMockPlan(enabled: boolean) {
    return {
      shortName: faker.random.alphaNumeric(10),
      shortKey: faker.random.alphaNumeric(5),
      type: faker.random.alphaNumeric(5),
      enabled: enabled,
      link: MockDataHelper.getMockLink(),
      key: faker.random.alphaNumeric(20),
      name: faker.random.alphaNumeric(20),
      planKey: {
        key: faker.random.alphaNumeric(20),
      },
    }
  }

  static getMockProject() {
    return {
      id: faker.random.number(1000),
      oid: faker.random.alphaNumeric(20),
      key: {
        key: faker.random.alphaNumeric(10),
      },
      name: faker.random.alphaNumeric(50),
      planKey: {
        key: faker.random.alphaNumeric(10),
      },
    }
  }
}
