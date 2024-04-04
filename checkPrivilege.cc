#include <napi.h>
#include <Windows.h>
#include <lm.h>
#include <string>

#pragma comment(lib, "Netapi32.lib")

Napi::Value checkPrivilege(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    std::string username = info[0].As<Napi::String>();

    USER_INFO_1 *pUserInfo;
    DWORD dwLevel = 1;
    DWORD dwError = 0;
    NET_API_STATUS nStatus;
    std::string role;

    std::wstring ws(username.begin(), username.end());
    wchar_t *formated_userName = new wchar_t[ws.length() + 1];
    wcscpy_s(formated_userName, ws.length() + 1, ws.c_str());

    nStatus = NetUserGetInfo(nullptr, formated_userName, dwLevel, reinterpret_cast<LPBYTE *>(&pUserInfo));
    if (nStatus == NERR_Success)
    {
        if (pUserInfo->usri1_priv == USER_PRIV_GUEST)
            role = "GUEST";
        else if (pUserInfo->usri1_priv == USER_PRIV_USER)
            role = "USER";
        else if (pUserInfo->usri1_priv == USER_PRIV_ADMIN)
            role = "ADMIN";
    }
    else
        role = "UNKNOWN";

    Napi::String res = Napi::String::New(env, role);
    return (res);
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "checkPrivilege"), Napi::Function::New(env, checkPrivilege));
    return exports;
}

NODE_API_MODULE(checkPrivilege, Init)