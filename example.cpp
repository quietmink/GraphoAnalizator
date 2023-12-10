// g++ -fPIC -shared -o example.dll example.cpp

extern "C" {
    int myFunction() {
        return 56;
    }
}