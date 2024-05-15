import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { TodoModule } from './todo/todo.module';
import { Module } from '@nestjs/common';
import { ZitadelAuthModule } from 'nest-zitadel';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { QuestionModule } from './question/question.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    TodoModule,
    QuestionModule,
    TestModule,
    AuthModule,
    ZitadelAuthModule.forRoot({
      authority: 'http://localhost:8080',
      authorization: {
        type: 'jwt-profile',
        profile: {
          type: 'application',
          keyId: '267215468744409091',
          key: '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA2NYPAYPaq9Z+JNFKVGaIMnPtrr9mBs/3ALqn9kSgc3nQRmZ/\nanPN9Tu/fD0zrzwSsENv6RcudS1VALohrhYg+QpfgS2uy7L/DO1+ySq2VHTEsSO/\n0GykjV5Hst1fGcaEtnIi3MqU2Nol4yQ6aIA6NU1sb0wngYsLZWvWUe6VbYnvjoCJ\ny/jQhIkEGRQx6W00Xpr4eHeGoGR1ihGty+lOvGivhaOhLzB3Z+A52pQ8SBV7OEad\niq2YANoy7wJaZqKk+7132ixe6gkLLcwPPPXfifMVpjdiEUS3pFZsQ62vTHigrPG+\nbyxg47hZKTFcFCoO7AOIr46hPFmrsiK6Gu6jowIDAQABAoIBAQC2NVJQxJrZMRm5\nGIGsYKhsNQxyfnVenh0CaNdBUzO9NYx1zCWfr4ZPX5Ct9sPaqdFOeqysowUwBBLc\n1Iv+vKuiejv80gWDOHuoQl3670Bdwe2SqObDXrf771CyleEXSME2iryO6lCf1Nhn\ngYbvT2kaZ2AKOmUsL0o5RJ/JI4I/k0/qllfwib+fz6RENfgfmYzj+ZTClPoOwoa4\nj/Z0YeOCe1nhiGKQOotjZuZP6caLR3fvNcy9tRKBtPMuRoOHuxqKv41HlGMM8Sj7\ndhV3qpTMqVXBD2vTfGwOb1iuhShsh7lyHGE/aSyTwiGBPxAyCLzq/N5T0cQIOhMu\nBa1qHxTxAoGBAODSf7lxwYhkvBx0X+aG327W2RO+APkC3M3vPGAWCsKm3ZjDSyGW\nVf/aGARDWwrDtIUEc5ab662vyXNchX2K/++220CsHkP6ulhQAbIr81toFDZwm4Y4\n65Qeu4YJCnfuRbxc0yvQD/es7SaLZTo3+DHUZCi8MalN2/VFnjCQ7KgrAoGBAPbo\nCtMLYfpVNzGHLPW4DSTjWtKQ1PsSOpkjXMkKE3w+rc6kZgZ2Y3mwEYJIhLwbyoUX\nRQFF5ALpw2po6s+eJXYJHevb4mMqwITHHoVoXXQVm2tqvtqBuw/+eFKqkOMoCIQN\nOkkjaBbf6x9pWGB2LZnk6Z6xiOEbdxm4k++Uif5pAoGAdNvVef3wG8ZIpP20j23R\nm5pfcUyU0tozDXPpzQQICc+UZYA1gDrVbszdKPId04WQQofi0QkwwrIZozYXSP9E\nM0S3yHDutmUQETFdAFCqCPwbbYSwwl65zN8AmBYA8//NDbCuLxrSAepHxn40WsOW\n5cfBXA8ePSN0TpQmOpZJ/MsCgYA44IFF1pRub1z0itgfjpNwkPMmGHkHkU5wYoYI\nRcrxTxsIxDRAftsxeA7AfWYeUySW/iJGRcxdo24BwEN/KkYk57q9z3xaLcoFjD0K\nrF0C1ctktkVa3pGyAIPFP0d7HIjBqq5nlMFwq4plRQY3ymF81w++H9WRTZtlEHD7\nurMDKQKBgD3qET53lj0Xn1cC6w4Q9jlKOIiKV2faTUyUPffKnPe1dry0Juh44HHp\n7kBjaitrplSvQbe9lmWiQlRdFjlw7lSgyu++cdLe9bisT76qZCSQ/zFqCpZ0UTSf\nWbz9YeV4ucvXzYCFI8zgK+9iatdPanMNKOVdk5HLboQOk85gr/dw\n-----END RSA PRIVATE KEY-----\n',
          appId: '267215443494699011',
          clientId: '267215443494764547@test',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
