import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  authorOrganization: true,
  cdkVersion: '2.80.0',
  defaultReleaseBranch: 'main',
  typescriptVersion: '5.5.x',
  jsiiVersion: '5.5.x',
  name: '@gammarers/aws-static-website-hosting-bucket',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-static-website-hosting-bucket.git',
  deps: [
    '@gammarers/aws-cdk-errors@^1.1.0',
  ],
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  workflowNodeVersion: '22.4.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      //schedule: javascript.UpgradeDependenciesSchedule.expressions(['3 17 * * 0']), // every sunday (JST/MON:02:00)
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['45 3 * * *']), // every sunday (JST/MON:02:00)
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();