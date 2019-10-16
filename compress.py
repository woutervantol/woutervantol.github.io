import numpy as np




data = np.loadtxt("Meteorite_Landings copy.csv", dtype={ "names": ("name", "id", "nametype", "recclass", "mass", "fall", "year", "reclat", "reclong", "geoloc"),
                                                    "formats": (str, int, str, str, float, str, str, float, float, str)}, delimiter=",")

print(data[1])