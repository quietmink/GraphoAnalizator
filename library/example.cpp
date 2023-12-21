// To make DLL use "x64 Native Tools Command Prompt for VS Code 2022" in library directory:
// cl /c /EHsc example.cpp
// link /DLL /OUT:example.dll example.obj && del example.lib && del example.exp && del example.obj

#include <fstream>
#include <sstream>
#include <vector>

using namespace std;

extern "C" {
    __declspec(dllexport) void addVertexCPP(int id, int weight) { // добавление вершины в список смежности
        const string filename = "./matrix/matrix.txt";

        fstream inFile(filename, ios::app);

        inFile.seekg(0, ios::end);
        bool isEmpty = inFile.tellg() == 0;

        if (!isEmpty) {
            inFile << endl;
        }
        inFile << id << ":" << weight;
        inFile.close();
    }

    // __declspec(dllexport) void removeVertexCPP(int id) { // удаление вершины из списка смежности
    // }

    __declspec(dllexport) void addEdgeCPP(int id1, int id2, int weight) { // добавление ребра в список смежности
        const string filename = "./matrix/matrix.txt";

        fstream inFile(filename);
        vector<string> lines;
        string line;

        while (getline(inFile, line)) {
            lines.push_back(line);
        }
        inFile.close();

        bool edgeExists1 = false;
        bool edgeExists2 = false;

        for (size_t i = 0; i < lines.size(); ++i) {
            istringstream iss(lines[i]);
            int currentId;
            char separator;
            iss >> currentId >> separator;

            if (currentId == id1) {
                lines[i] += " " + to_string(id2) + ":" + to_string(weight);
                edgeExists1 = true;
            }
            else if (currentId == id2) {
                lines[i] += " " + to_string(id1) + ":" + to_string(weight);
                edgeExists2 = true;
            }
        }

        if (!edgeExists1 && !edgeExists2) {
            lines.push_back(to_string(id1) + ":" + to_string(weight) + " " + to_string(id2) + ":" + to_string(weight));
            lines.push_back(to_string(id2) + ":" + to_string(weight) + " " + to_string(id1) + ":" + to_string(weight));
        }

        ofstream outFile(filename);
        for (size_t i = 0; i < lines.size(); ++i) {
            outFile << lines[i];
            if (i < lines.size() - 1) {
                outFile << endl;
            }
        }
        outFile.close();
    }

    __declspec(dllexport) void removeEdgeCPP(int id1, int id2) { // удаление ребра из списка смежности
        const string filename = "./matrix/matrix.txt";

        fstream inFile(filename);
        vector<string> lines;
        string line;

        while (getline(inFile, line)) {
            lines.push_back(line);
        }
        inFile.close();

        for (size_t i = 0; i < lines.size(); ++i) {
            istringstream iss(lines[i]);
            int currentId;
            char separator;
            iss >> currentId >> separator;

            if (currentId == id1) {
                int pos = lines[i].find(to_string(id2) + ":");
                if (pos != string::npos) {
                    size_t endPos = lines[i].find(' ', pos);
                    if (endPos == string::npos) {
                        endPos = lines[i].size();
                    }
                    lines[i].erase(pos, endPos - pos + 1);
                }
            }
        }

        for (int i = 0; i < lines.size(); ++i) {
            istringstream iss(lines[i]);
            int currentId;
            char separator;
            iss >> currentId >> separator;

            if (currentId == id2) {
                int pos = lines[i].find(to_string(id1) + ":");
                if (pos != string::npos) {
                    size_t endPos = lines[i].find(' ', pos);
                    if (endPos == string::npos) {
                        endPos = lines[i].size();
                    }
                    lines[i].erase(pos, endPos - pos + 1);
                }
            }
        }

        ofstream outFile(filename);
        for (int i = 0; i < lines.size(); ++i) {
            size_t endPos = lines[i].find_last_not_of(" \t");
            if (endPos != string::npos) {
                lines[i].erase(endPos + 1);
            }
            outFile << lines[i];
            if (i < lines.size() - 1) {
                outFile << endl;
            }
        }
        outFile.close();
    }
}
