import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:green_ledger/services/services.dart';
import 'package:green_ledger/ui/features/basic_authetication.dart';
import 'package:green_ledger/ui/features/flutter_wallet.dart';
import 'bloc/metamask_auth_bloc.dart';

void main() {
  initServices();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => MetaMaskAuthBloc(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Secure Bank',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const BasicAuthenticationPage(), //for deployment
        // FlutterWallet(), //for development
      ),
    );
  }
}
