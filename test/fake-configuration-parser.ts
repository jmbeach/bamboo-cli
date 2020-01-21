import * as proxyquire from 'proxyquire'
export default function fakeConfigurationParserFactory(url: string, tabCount: number) {
  const data = new Map<string, any>()
  data.set('url', url)
  data.set('errorMessages', [])
  data.set('tabCount', tabCount)
  data.set('username', 'test')
  data.set('password', 'test1234')
  class FakeConf {
    get(key: string) {
      return data.get(key)
    }
  }
  const FakeConfigurationParser = proxyquire('../src/configuration-parser', {
    conf: FakeConf,
  })

  return FakeConfigurationParser
}
