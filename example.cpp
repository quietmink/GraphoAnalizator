// g++ -fPIC -shared -o example.dll example.cpp

#include <string>

extern "C" {
    __declspec(dllexport) int myFunction() {
        return 56;
    }
}
