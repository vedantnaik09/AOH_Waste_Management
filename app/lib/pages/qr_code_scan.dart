import 'package:flutter/material.dart';
import 'package:qr_mobile_vision/qr_camera.dart';

class QRCodeScan extends StatefulWidget {
  const QRCodeScan({super.key});

  @override
  State<QRCodeScan> createState() => _QRCodeScanState();
}

class _QRCodeScanState extends State<QRCodeScan> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Scaffold(
        body: Center(
          child: SizedBox(
            width: 400.0,
            height: 1000.0,
            child: QrCamera(
              qrCodeCallback: (code) {
                debugPrint(code);
              },
            ),
          ),
        ),
      ),
    );
  }
}
