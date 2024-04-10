import 'package:custom_accordion/custom_accordion.dart';
import 'package:flutter/material.dart';

class BankRecords extends StatelessWidget {
  final Map<String, dynamic> records = {
    "name": "Tej Ghelani",
    "mobileNumber": "8850233145",
    "email": "tejghelani@gmail.com",
    "idNumber": "6666 9999 6666",
    "billNumber": "8888 5555 8888",
    "profilePic":
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
    "issuedDate": "17/10/2023",
    "kyc_id": "123456",
    "idType": "Aadhar",
    "idImage":
        "https://aadhaarcard.co.in/wp-content/uploads/2023/04/aadhaar-card-800x445.webp",
    "selfie":
        "https://clipart-library.com/2023/smiling-guy-takes-a-selfie-clipart-xl.png",
    "bill":
        "https://imgv2-1-f.scribdassets.com/img/document/545447729/original/997dfbf662/1706347722?v=1",
    "bankId": "abc123",
    "bankName": "BRUC bank",
    "branch": "Kandivali West",
    "KYC_status": false
  };

  BankRecords({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: () {
          Navigator.pop(context);
        },
        child: const Icon(Icons.arrow_back),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.startTop,
      body: SingleChildScrollView(
          child: Padding(
        padding: const EdgeInsets.only(top: 100.0),
        child: Column(children: [
          const Text(
            "Registrations this past week",
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
          ),
          for (var i = 0; i < 15; i++)
            CustomAccordion(
              title: records["name"],
              widgetItems: Column(
                  children: records.entries.map((entry) {
                return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: Text(
                      ' ${entry.value}',
                      style: const TextStyle(fontSize: 16),
                    ));
              }).toList()),
            )
        ]),
      )),
    );
  }
}
