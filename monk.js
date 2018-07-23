const monk = require('monk')
const uri = 'mongodb://root:alfierichou@47.74.234.5:27017/test'
const db = monk(uri)

const transfer = async () => {
const session = monk.startSession()
session.startTransaction()
  try {
    const user = await db.get('users').insert({firstName: 'alfieri'})
    await db.get('users').findOneAndUpdate({_id: user._id}, { $inc: { lastName: 'chou'}})
    await session.commitTransaction()
    session.endSession()
    return user
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    throw new Error('something went wrong')
  }
}

console.log('------>', transfer())