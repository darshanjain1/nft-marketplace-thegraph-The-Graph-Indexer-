import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ItemCanceled as ItemCanceledEvent,
  NftBought as NftBoughtEvent,
  NftListed as NftListedEvent,
} from "../generated/NftMarketplace/NftMarketplace"
import {
  ItemCanceled,
  NftBought,
  NftListed,
  ActiveItem
} from "../generated/schema"

export function handleItemCanceled(event: ItemCanceledEvent): void {
  const id = getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  let entity = new ItemCanceled(
    id
  )
  let activeItemEntity = ActiveItem.load(id)
  activeItemEntity!.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD")
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  activeItemEntity!.save()
}

export function handleNftBought(event: NftBoughtEvent): void {
  const id = getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  let activeItemEntity = ActiveItem.load(id)
  let entity = new NftBought(id)
  entity.buyer = event.params.buyer
  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  activeItemEntity!.buyer = event.params.buyer

  entity.save()
  activeItemEntity!.save()
}

export function handleNftListed(event: NftListedEvent): void {
  const id = getIdFromEventParams(event.params.tokenId, event.params.nftAddress)

  let entity = NftListed.load(id)
  let activeItemEntity = ActiveItem.load(id)
  if (!activeItemEntity) {
    activeItemEntity = new ActiveItem(
      id
    )
  activeItemEntity.buyer = Address.fromHexString('0x0000000000000000000000000000000000000000')
  }
  if (!entity) {
    entity = new NftListed(
      id
    )
  }

  activeItemEntity.nftAddress = event.params.nftAddress
  activeItemEntity.tokenId = event.params.tokenId
  activeItemEntity.seller = event.params.seller
  activeItemEntity.price = event.params.price

  entity.nftAddress = event.params.nftAddress
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  activeItemEntity.save()
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Bytes): string {
  return tokenId.toHexString() + nftAddress.toHexString()
}