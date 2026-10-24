import { type SchemaTypeDefinition } from 'sanity'
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import { location } from './locations'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType,location],
}

// fixd