import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class SubmitKyc extends StatefulWidget {
  const SubmitKyc({super.key});

  @override
  _SubmitKycState createState() => _SubmitKycState();
}

class _SubmitKycState extends State<SubmitKyc> {
  String request = "Not submitted yet";
  String username = "user invalid";
  final _formKey = GlobalKey<FormState>();
  TextEditingController mobileNumberController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController aadharCardNumberController = TextEditingController();
  TextEditingController billNumberController = TextEditingController();
  TextEditingController issuedDateController = TextEditingController();
  TextEditingController kycIdController = TextEditingController();
  TextEditingController idTypeController = TextEditingController();
  TextEditingController idImageController = TextEditingController();
  TextEditingController selfieController = TextEditingController();
  TextEditingController billController = TextEditingController();
  TextEditingController bankIdController = TextEditingController();
  TextEditingController bankNameController = TextEditingController();
  TextEditingController branchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    getUsername();
  }

  void getUsername() async {
    var prefs = await SharedPreferences.getInstance();
    username = prefs.getString('secure_bank_username').toString();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Submit KYC'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              children: [
                TextFormField(
                  controller: mobileNumberController,
                  decoration: const InputDecoration(
                    labelText: 'Mobile Number',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a mobile number';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: emailController,
                  decoration: const InputDecoration(
                    labelText: 'Email',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter an email';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: aadharCardNumberController,
                  decoration: const InputDecoration(
                    labelText: 'Aadhar Card Number',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter an Aadhar card number';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: billNumberController,
                  decoration: const InputDecoration(
                    labelText: 'Bill Number',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a bill number';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: issuedDateController,
                  decoration: const InputDecoration(
                    labelText: 'Issued Date',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter an issued date';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: kycIdController,
                  decoration: const InputDecoration(
                    labelText: 'KYC ID',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a KYC ID';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: idTypeController,
                  decoration: const InputDecoration(
                    labelText: 'ID Type',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter an ID type';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: billController,
                  decoration: const InputDecoration(
                    labelText: 'Bill',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a bill';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: bankIdController,
                  decoration: const InputDecoration(
                    labelText: 'Bank ID',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a bank ID';
                    }
                    return null;
                  },
                ),
                TextFormField(
                  controller: branchController,
                  decoration: const InputDecoration(
                    labelText: 'Branch',
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a branch';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16.0),
                ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState != null) {
                      if (_formKey.currentState!.validate()) {
                        // Create the JSON object
                        Map<String, dynamic> kycData = {
                          "customerObject": {
                            "mobileNumber": mobileNumberController.text,
                            "email": emailController.text,
                            "aadharCardNumber": aadharCardNumberController.text,
                            "billNumber": billNumberController.text,
                            "issueDate": issuedDateController.text,
                            "kyc_id": kycIdController.text,
                            "idType": idTypeController.text,
                            "bankName": bankNameController.text,
                            "branch": branchController.text,
                            "KYC_status": 0
                          }
                        };

                        // Convert the JSON object to a string
                        String json = jsonEncode(kycData);
                        debugPrint(json);
                        String url =
                            "https://eda4-2409-40c0-7f-e125-d00b-dfef-8bfc-7a1f.ngrok-free.app/addCustomerData?customerName=$username";
                        // Print the JSON string
                        var request = http.Request('Get', Uri.parse(url));
                        request.body = json;
                        request.headers['Content-Type'] = 'application/json';
                        request.send();
                        debugPrint("Request sent");
                      }
                    }
                  },
                  child: const Text('Submit'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
