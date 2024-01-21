-- CreateTable
CREATE TABLE "Automobile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "plate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "brand" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AutomobileUsage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME,
    "purpose" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    "automobileId" INTEGER NOT NULL,
    CONSTRAINT "AutomobileUsage_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AutomobileUsage_automobileId_fkey" FOREIGN KEY ("automobileId") REFERENCES "Automobile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
