// TEST PROGRAM

#include<iostream>
#include<algorithm>

void fail () {
	fail();
}

using namespace std;
signed 
main () {
    int size; 
    std::cin >> size;
    int arr[size];
    for ( int i = 0; i < size; ++i ) {
		std::cin >> arr[i];
	}
	std::sort(arr, arr + size);

    for ( int i = 0; i < size; ++i ) {
		std::cout << arr[i] << " ";
	}
	std::cout << std::endl;
    return 0;
}
