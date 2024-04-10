import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:green_ledger/bloc/metamask_auth_bloc.dart';
import 'package:green_ledger/bloc/wallet_state.dart';
import 'package:green_ledger/ui/features/flutter_wallet.dart';
import 'package:green_ledger/ui/features/widgets/custom/other_custom_widgets.dart';
import 'package:green_ledger/ui/features/widgets/custom/show_snack_bar.dart';
import 'package:green_ledger/utils/constants/app_constants.dart';
import 'package:green_ledger/utils/constants/assets.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../bloc/wallet_event.dart';
import 'widgets/custom/nsalert_dialog.dart';

class MetaMaskLoginScreen extends StatefulWidget {
  const MetaMaskLoginScreen({super.key});

  @override
  State<MetaMaskLoginScreen> createState() => _MetaMaskLoginScreenState();
}

class _MetaMaskLoginScreenState extends State<MetaMaskLoginScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey();
  BuildContext? dialogContext;
  final String signatureFromBackend = "Secure Bank Boiled Rice";
  @override
  Widget build(BuildContext context) {
    return BlocListener<MetaMaskAuthBloc, WalletState>(
      listener: (context, state) {
        if (state is WalletErrorState) {
          hideDialog(dialogContext);
          ShowSnackBar.buildSnackbar(context, state.message, true);
        } else if (state is WalletReceivedSignatureState) {
          //received signature from metamask success
          hideDialog(dialogContext);
          ShowSnackBar.buildSnackbar(
              context, AppConstants.authenticationSuccessful);
          Future.delayed(const Duration(milliseconds: 500), () {
            Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const FlutterWallet()));
          });
        }
      },
      child: Scaffold(
        key: _scaffoldKey,
        body: SafeArea(
          child: Center(
            child: InkWell(
              onTap: () {
                BlocProvider.of<MetaMaskAuthBloc>(context).add(
                  MetamaskAuthEvent(signatureFromBackend: signatureFromBackend),
                );
                buildShowDialog(context);
              },
              child: Card(
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Image.asset(
                        Assets.metamaskIcon,
                        height: 80,
                        width: 80,
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      const Text(
                        AppConstants.metamaskLogin,
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  buildShowDialog(BuildContext context) {
    return showDialog(
        context: _scaffoldKey.currentContext ?? context,
        barrierDismissible: true, //if user should not
        //cancel this dialog then set as false
        builder: (BuildContext dialogContextL) {
          dialogContext = dialogContextL;
          return BlocBuilder<MetaMaskAuthBloc, WalletState>(
              builder: (context, state) {
            return NSAlertDialog(
              textWidget: getText(state),
            );
          });
        });
  }

  getText(WalletState state) {
    String message = "";
    if (state is WalletInitializedState) {
      //initialized metamask success
      message = state.message;
    } else if (state is WalletAuthorizedState) {
      //received authorized approval success
      message = state.message;
    } else if (state is WalletReceivedSignatureState) {
      //received signature from metamask success
      message = state.message;
    }
    return Text(
      message,
      style: const TextStyle(fontSize: 18, color: Colors.white),
    );
  }
}
