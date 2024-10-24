import { InvalidHostingBucketDomainFormatError, InvalidHostingBucketDomainLabeFormatError } from '@gammarers/aws-cdk-errors';
import { App, Stack } from 'aws-cdk-lib';
import { StaticWebseiteHostingBucket } from '../src';

describe('StaticWebseiteHostingBucket Error Testing', () => {

  const app = new App();
  const stack = new Stack(app, 'TestingStack', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  });

  it('Should error InvalidHostingBucketDomainFormatError', () => {
    expect(() => {
      new StaticWebseiteHostingBucket(stack, 'StaticWebseiteHostingBucketInvalidDomainError', {
        customDomain: 'example-bucket',
      });
    }).toThrow(InvalidHostingBucketDomainFormatError);
  });

  it('Should error InvalidHostingBucketDomainFormatError', () => {
    expect(() => {
      new StaticWebseiteHostingBucket(stack, 'StaticWebseiteHostingBucketInvalidDomainLabelError', {
        bucketName: 'example.bucket',
      });
    }).toThrow(InvalidHostingBucketDomainLabeFormatError);
  });

});