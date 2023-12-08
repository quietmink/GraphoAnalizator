// g++ -shared -o example.dll -fPIC example.cpp

extern "C" {
    int myFunction() {
        return 56;
    }
}