-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AutomobileUsage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME,
    "purpose" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL DEFAULT 0,
    "automobileId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "AutomobileUsage_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
    CONSTRAINT "AutomobileUsage_automobileId_fkey" FOREIGN KEY ("automobileId") REFERENCES "Automobile" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE
);
INSERT INTO "new_AutomobileUsage" ("automobileId", "driverId", "endDate", "id", "purpose", "startDate") SELECT "automobileId", "driverId", "endDate", "id", "purpose", "startDate" FROM "AutomobileUsage";
DROP TABLE "AutomobileUsage";
ALTER TABLE "new_AutomobileUsage" RENAME TO "AutomobileUsage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
