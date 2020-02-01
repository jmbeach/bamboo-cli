import faker = require('faker')

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

  static getMockBuildStatus(enabled: boolean, lifeCycleState: 'InProgress' | 'Finished') {
    return {
      enabled: faker.random.alphaNumeric(100),
      link: MockDataHelper.getMockLink(),
      plan: MockDataHelper.getMockPlan(enabled),
      planName: faker.random.alphaNumeric(20),
      projectName: faker.random.alphaNumeric(20),
      buildResultKey: faker.random.alphaNumeric(10),
      lifeCycleState: lifeCycleState,
      id: faker.random.number(10000),
      buildStartedTime: faker.date.soon(),
      progress: {
        isValid: true,
        isUnderAverageTime: true,
        percentageCompleted: faker.random.float({
          min: 0, max: 1, precision: 10,
        }),
        percentageCompletedPretty: faker.random.number(2) + '%',
        prettyTimeRemaining: faker.random.number(60) + ' secs remaining',
        prettyTimeRemainingLong: `Approximately ${faker.random.number(60)} seconds remaining`,
        averageBuildDuration: faker.random.number(100),
        prettyAverageBuildDuration: `${faker.random.number(60)} seconds`,
        buildTime: faker.random.number(100),
        prettyBuildTime: `${faker.random.number(60)} seconds`,
        startedTime: faker.date.soon(),
        startedTimeFormatted: faker.date.soon(),
        prettyStartedTime: faker.random.number(60) + ' secs ago',
      },
      number: faker.random.number(100),
    }
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
