const uuid = require('uuidv4')
import {
  storeSolicitation,
  ISolicitationStore,
  PersistDataTypes,
} from '@shared/whisper/persistDataHandler'
import BigNumber from 'bignumber.js'
import {toTopic, getTopic} from '@shared/whisper'

const solicitationUuid = uuid()
const getSolicitationStore = async () => {
  const solicitationStore: ISolicitationStore = {
    messageType: PersistDataTypes.storeSolicitation,
    session: solicitationUuid,
    reward: new BigNumber(0),
    topic: '0xa74846db',
    attestationId: 'df990a7f-92a9-4a0f-8491-c333d37178b5',
    negotiationSession: solicitationUuid,
    attestationTopic: await toTopic(await getTopic('phone')),
  }
  return solicitationStore
}

describe('Acting on solicitation', () => {
  it('does something', async () => {
    storeSolicitation(await getSolicitationStore())
  })
})
