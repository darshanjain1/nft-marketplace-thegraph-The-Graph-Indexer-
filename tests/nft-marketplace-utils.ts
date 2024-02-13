import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ItemCanceled,
  NftBought,
  NftListed,
  WithdrawProceeded
} from "../generated/NftMarketplace/NftMarketplace"

export function createItemCanceledEvent(
  nftAddress: Address,
  tokenId: BigInt,
  seller: Address
): ItemCanceled {
  let itemCanceledEvent = changetype<ItemCanceled>(newMockEvent())

  itemCanceledEvent.parameters = new Array()

  itemCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemCanceledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return itemCanceledEvent
}

export function createNftBoughtEvent(
  buyer: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): NftBought {
  let nftBoughtEvent = changetype<NftBought>(newMockEvent())

  nftBoughtEvent.parameters = new Array()

  nftBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  nftBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  nftBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftBoughtEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftBoughtEvent
}

export function createNftListedEvent(
  nftAddress: Address,
  tokenId: BigInt,
  seller: Address,
  price: BigInt
): NftListed {
  let nftListedEvent = changetype<NftListed>(newMockEvent())

  nftListedEvent.parameters = new Array()

  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  nftListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return nftListedEvent
}

export function createWithdrawProceededEvent(
  withdrawer: Address,
  amount: BigInt
): WithdrawProceeded {
  let withdrawProceededEvent = changetype<WithdrawProceeded>(newMockEvent())

  withdrawProceededEvent.parameters = new Array()

  withdrawProceededEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawer",
      ethereum.Value.fromAddress(withdrawer)
    )
  )
  withdrawProceededEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawProceededEvent
}
