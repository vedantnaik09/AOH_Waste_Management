import 'package:flutter/material.dart';
import 'package:green_ledger/ui/features/metamask_login_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class BasicAuthenticationPage extends StatefulWidget {
  const BasicAuthenticationPage({super.key});

  @override
  _BasicAuthenticationPageState createState() =>
      _BasicAuthenticationPageState();
}

class _BasicAuthenticationPageState extends State<BasicAuthenticationPage> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  List<String> customerAdminOptions = ["Admin", "Customer"];
  String selectedCustomerAdminOption = "Customer";

  List<String> loginSignupOptions = ['Login', 'Signup'];
  String selectedLoginSignupOption = "Login";

  String? username;

  @override
  void initState() {
    super.initState();
    getUsername();
  }

  void getUsername() async {
    var prefs = await SharedPreferences.getInstance();
    username = prefs.getString('secure_bank_username');
  }

  void setUsername() async {
    var prefs = await SharedPreferences.getInstance();
    prefs.setString('secure_bank_username', _usernameController.text);
    prefs.setString('rank', selectedCustomerAdminOption);
    debugPrint(prefs.getString('secure_bank_username').toString());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Basic Authentication'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              children: [
                const Text('Customer/Admin: '),
                const SizedBox(width: 16.0),
                DropdownButton<String>(
                  value: selectedCustomerAdminOption,
                  onChanged: (String? newValue) {
                    setState(() {
                      selectedCustomerAdminOption = newValue!;
                    });
                  },
                  items: customerAdminOptions
                      .map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                ),
              ],
            ),
            const SizedBox(height: 16.0),
            Row(
              children: [
                const Text('Login/Signup: '),
                const SizedBox(width: 16.0),
                DropdownButton<String>(
                  value: selectedLoginSignupOption,
                  onChanged: (String? newValue) {
                    setState(() {
                      selectedLoginSignupOption = newValue!;
                    });
                  },
                  items: loginSignupOptions
                      .map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                ),
              ],
            ),
            const SizedBox(height: 16.0),
            TextField(
              controller: _usernameController,
              decoration: const InputDecoration(
                labelText: 'Username',
              ),
            ),
            const SizedBox(height: 16.0),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(
                labelText: 'Password',
              ),
              obscureText: true,
            ),
            const SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () async {
                setUsername();

                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const MaterialApp(
                              home: Scaffold(
                                body: Center(child: MetaMaskLoginScreen()),
                              ),
                            )));
                // Perform login/signup logic here
                // Redirect to another page
              },
              child: const Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }
}
