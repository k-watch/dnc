const { faker } = require('@faker-js/faker')
const fs = require('fs')
const brokers = require('./brokers.json')
const accountStatus = require('./accountStatus.json')

faker.setLocale('ko')

const users = []
const accounts = []

const brokercode = Object.keys(brokers)
const accountStatusCode = Object.values(accountStatus)

let acc_id = 1

for (let i = 1; i < 101; i++) {
  // generate fake users and settings
  const uuid = faker.datatype.uuid()
  const user = {
    id: i,
    uuid,
    photo: faker.internet.avatar(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    age: faker.datatype.number({ min: 20, max: 66 }),
    genderOrigin: faker.datatype.number({ min: 1, max: 4 }),
    birthDate: faker.date.birthdate({ min: 20, max: 65, mode: 'age' }),
    phoneNumber: faker.phone.number('010-####-####'),
    address: `${faker.address.country()} ${faker.address.city()}`,
    detailAddress: faker.address.streetAddress(true),
    lastLogin: faker.date.between('2022-01-01', '2022-08-01'),
    allowMarketingPush: faker.datatype.boolean(),
    allowInvestPush: faker.datatype.boolean(),
    isActive: faker.datatype.boolean(),
    isStaff: faker.datatype.boolean(),
    createdAt: faker.date.between('2019-04-01', '2022-08-01'),
    updatedAt: faker.date.between('2019-04-01', '2022-08-01'),
  }
  users.push(user)

  // generate fake accounts
  for (let j = 1; j < faker.datatype.number({ min: 2, max: 11 }); j++) {
    const accountBrokerCode = brokercode.sort(() => 0.5 - Math.random())[0]
    const status = accountStatusCode.sort(() => 0.5 - Math.random())[0]
    const account = {
      id: acc_id++,
      userId: i,
      uuid: faker.datatype.uuid(),
      brokerId: accountBrokerCode,
      status,
      number: faker.finance.account(12),
      name: faker.finance.accountName(),
      assets: faker.finance.amount(200000, 1000000000),
      payments: faker.finance.amount(200000, 1000000000),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.between('2019-04-01', '2022-08-01'),
      updatedAt: faker.date.between('2019-04-01', '2022-08-01'),
    }
    accounts.push(account)
  }
}

const data = { users, accounts }
fs.writeFileSync('db.json', JSON.stringify(data))
console.log('...generated db.json')
