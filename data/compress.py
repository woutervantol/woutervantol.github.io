import numpy as np



f = open("test.csv", "w")

data = np.loadtxt("compresseddata.csv", dtype=str, delimiter=",", skiprows=1)

print(len(data))
for i in range(len(data)):
    if data[i, 8] == "0.000000":#haal alle meteorieten met onbekende coordinaten er uit
        if data[i, 9] == "0.000000":
            print(i)
            np.delete(data, i)
        else:
            print(data[i])
    else:
        for j in range(len(data[i])):
            if j == 4:#maak een integer van alle massa's
                print(data[i, j])
                f.write(str(int(float(data[i, j])))) 
            elif j == 6:#haal de dag en tijd weg(is bijna overal 01/01 12:00:00 AM dus nutteloos)
                f.write(str(int(float(data[i, j][6:10]))))
            elif j == 9:#verwijder geolocation, aangezien het hetzelfde is als de reclat en reclong
                pass
            else:
                f.write(data[i, j])
            f.write(",")
        f.write("\n")
print(data)
print(len(data))


f.close()
