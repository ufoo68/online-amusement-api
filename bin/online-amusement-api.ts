#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { OnlineAmusementApiStack } from '../lib/online-amusement-api-stack';

const app = new cdk.App();
new OnlineAmusementApiStack(app, 'OnlineAmusementApiStack');
