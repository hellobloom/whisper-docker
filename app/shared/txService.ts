import fetch from 'node-fetch'
import {env} from '@shared/environment'

let envPr = env()

export const txRequest = async (action: string, params: any) => {
  let e = await envPr
  if (!e.txService) return
  const url = e.txService.address + action

  console.log('Initiating request to tx-service', url, params)

  const response = await fetch(url, {
    headers: {
      API_TOKEN: e.txService.key,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    method: 'POST',
    body: JSON.stringify(Object.assign({}, params, {webhook_key: 'bloom-web'})),
  })

  console.log('Completed tx-service request', response)

  return response
}

export const getTx = (id: number) => {
  return txRequest(`/api/txs/${id}`, {})
}

export const getTxs = (params: {where?: any}) => {
  return txRequest(`/api/txs`, params)
}

export const sendTx = (params: {
  tx: {
    network: string
    contract_name: string
    method: string
    args: object
    max_estimate_retries?: number
    
  }
  webhook?: {
    mined?: boolean,
    address?: string,
    key?: string,
  }
  expireIn?: number
}) => {
  return txRequest('/api/txs', params)
}

export const destroyTx = (id: number) => {
  return txRequest(`/api/txs/${id}`, {})
}
