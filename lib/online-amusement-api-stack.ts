import * as cdk from '@aws-cdk/core'
import { GraphQLApi, CfnApiKey, MappingTemplate, Values, PartitionKey, KeyCondition } from '@aws-cdk/aws-appsync'
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb'

export class OnlineAmusementApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const api = new GraphQLApi(this, 'graphQlApi', {
      name: 'online-amusement-api',
      schemaDefinitionFile: './schema.graphql',
    })

    new CfnApiKey(this, 'apiKey', {
      apiId: api.apiId,
    })

    const aquariumTable = new Table(this, 'aquariumTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    })

    const shrimeTable = new Table(this, 'shrimeTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    })

    const onsenTable = new Table(this, 'onsenTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    })

    const aquariumDS = api.addDynamoDbDataSource('aquarium', 'aquarium data source', aquariumTable)
    aquariumDS.createResolver({
      typeName: 'Query',
      fieldName: 'getAquarium',
      requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
    })
    aquariumDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'addAquarium',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PartitionKey.partition('id').auto(),
        Values.projecting('amusement'),
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    })

    const shrimeDS = api.addDynamoDbDataSource('shrime', 'shrime data source', shrimeTable)
    shrimeDS.createResolver({
      typeName: 'Query',
      fieldName: 'getShrime',
      requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
    })
    shrimeDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'addShrime',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PartitionKey.partition('id').auto(),
        Values.projecting('amusement'),
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    })

    const onsenDS = api.addDynamoDbDataSource('onsen', 'onsen data source', onsenTable)
    onsenDS.createResolver({
      typeName: 'Query',
      fieldName: 'getOnsen',
      requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList(),
    })
    onsenDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'addOnsen',
      requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
        PartitionKey.partition('id').auto(),
        Values.projecting('amusement'),
      ),
      responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
    })
  }
}