import { InvalidHostingBucketDomainFormatError, InvalidHostingBucketDomainLabeFormatError } from '@gammarers/aws-cdk-errors';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

/**
 * @TODO: Not yet supported
 * https://github.com/aws/jsii/issues/4468
 * type omitKeys = 'publicReadAccess|enforceSSL|blockPublicAccess';
 * export interface CodePipelineStateChangeDetectionEventRuleProps extends Omit<s3.BucketProps, 'publicReadAccess'> {}
 */

export interface StaticWebseiteHostingBucketProps extends s3.BucketProps {
  readonly customDomain?: string;
}

const domainFormatRegex = /^([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,63}$/;
const domainLabelFormatRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

export class StaticWebseiteHostingBucket extends s3.Bucket {
  constructor(scope: Construct, id: string, props?: StaticWebseiteHostingBucketProps) {
    super(scope, id, {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: '404.html',
      ...props,
      bucketName: (() => {
        if (props?.customDomain) {
          if (!domainFormatRegex.test(props.customDomain)) {
            throw new InvalidHostingBucketDomainFormatError(props.customDomain);
          }
          return props.customDomain;
        }
        if (props?.bucketName) {
          if (!domainLabelFormatRegex.test(props.bucketName)) {
            throw new InvalidHostingBucketDomainLabeFormatError(props.bucketName);
          }
          return props.bucketName;
        }
        return undefined;
      })(), // require bucket name equal domain name
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      encryption: s3.BucketEncryption.S3_MANAGED,
      eventBridgeEnabled: undefined,
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      // enforceSSL: !props?.customDomain,
      enforceSSL: false,
      //  targetObjectKeyFormat: (() => {
      //    if (props?.serverAccessLogsBucket) {
      //      if (!props?.targetObjectKeyFormat) {
      //        return s3.TargetObjectKeyFormat.partitionedPrefix(s3.PartitionDateSource.EVENT_TIME);
      //      }
      //    }
      //    retrun undefined;
      //  })(),
    });
  }
}