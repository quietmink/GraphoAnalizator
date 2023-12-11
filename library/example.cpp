// To make DLL use "x64 Native Tools Command Prompt for VS Code 2022" in libraries directory:
// cl /c /EHsc example.cpp
// link /DLL /OUT:example.dll example.obj 

#include <iostream>

extern "C" __declspec(dllexport) int myFunction() {
    return 78;
}