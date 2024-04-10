// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract UserDataContract is ERC721 {
    struct WasteInfo {
        uint256 date;
        string info;
    }

    struct UserData {
        string adminUsername;
        string username;
        uint256 totalDays;
        string dailyPlan;
        mapping(uint256 => string) wasteInfo; // Mapping from date to wasteInfo
        uint256[] dates;
    }

    mapping(uint256 => UserData) private userDataMap;
    uint256 private tokenIdCounter;

    constructor() ERC721("UserDataToken", "UDT") {}

    event UserRegistered(
        uint256 indexed tokenId,
        string adminUsername,
        string username
    );
    event DailyPlanUpdated(uint256 indexed tokenId, string newDailyPlan);
    event AdminUsernameUpdated(
        uint256 indexed tokenId,
        string newAdminUsername
    );
    event UsernameUpdated(uint256 indexed tokenId, string newUsername);
    event TotalDaysUpdated(uint256 indexed tokenId, uint256 newTotalDays);
    event DatesUpdated(uint256 indexed tokenId, uint256[] newDates);
    event WasteInfoUpdated(uint256 indexed tokenId, uint256 date, string newWasteInfo);

    function registerUser(
        string memory _adminUsername,
        string memory _username,
        uint256 _totalDays,
        string memory _dailyPlan,
        uint256[] memory _dates
    ) external {
        require(bytes(_adminUsername).length > 0, "Admin Username cannot be empty");
        require(bytes(_username).length > 0, "Username cannot be empty");

        uint256 newTokenId = tokenIdCounter;
        tokenIdCounter++;

        UserData storage userData = userDataMap[newTokenId];

        userData.adminUsername = _adminUsername;
        userData.username = _username;
        userData.totalDays = _totalDays;
        userData.dailyPlan = _dailyPlan;
        userData.dates = _dates;

        for (uint256 i = 0; i < _dates.length; i++) {
            userData.wasteInfo[_dates[i]] = ""; // Initialize wasteInfo for each date
        }

        _safeMint(msg.sender, newTokenId);

        emit UserRegistered(newTokenId, _adminUsername, _username);
    }

    function updateWasteInfo(
        uint256 _tokenId,
        uint256 _date,
        string memory _wasteInfo
    ) external {
        require(_exists(_tokenId), "Token ID does not exist");
        UserData storage userData = userDataMap[_tokenId];
        require(_dateExists(userData, _date), "Date does not exist for this user");
        userData.wasteInfo[_date] = _wasteInfo;
        emit WasteInfoUpdated(_tokenId, _date, _wasteInfo);
    }

    function _dateExists(UserData storage _userData, uint256 _date) private view returns (bool) {
        for (uint256 i = 0; i < _userData.dates.length; i++) {
            if (_userData.dates[i] == _date) {
                return true;
            }
        }
        return false;
    }

    function getUserData(
        uint256 _tokenId
    )
        external
        view
        returns (
            string memory adminUsername,
            string memory username,
            uint256 totalDays,
            string memory dailyPlan,
            uint256[] memory dates,
            WasteInfo[] memory wasteInfos
        )
    {
        UserData storage userData = userDataMap[_tokenId];
        WasteInfo[] memory _wasteInfos = new WasteInfo[](userData.dates.length);
        for (uint256 i = 0; i < userData.dates.length; i++) {
            _wasteInfos[i] = WasteInfo(userData.dates[i], userData.wasteInfo[userData.dates[i]]);
        }
        return (
            userData.adminUsername,
            userData.username,
            userData.totalDays,
            userData.dailyPlan,
            userData.dates,
            _wasteInfos
        );
    }
}
