import PackageP from "../models/packages_model.js";

// Set interface from the model
interface pack {
  id?: number;
  name: string;
  procedure_id: number;
  price: number;
  price_gbp: number;
  amount: number;
}

// Retrieve packages from the database.
export async function loadPack(saloon_id, res) {
  try {
    const data = await PackageP.getAllPack(saloon_id);

    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `No packages found.`,
      });
    } else {
      const packages = data
        .map(
          (item: {
            id: any;
            name: any;
            procedure_id: any;
            price?: any;
            price_gbp?: any;
            amount: any;
          }) => {
            if (item.price_gbp) {
              const { price_gbp, ...otherProps } = item;
              return { price: price_gbp, ...otherProps };
            }
            return item;
          }
        )
        .filter((item) => {
          if (item.price_gbp !== null && item.price !== null) return item;
        });

      res.json({ success: true, data: packages });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while retrieving packages.",
    });
  }
}

// Find a single package by an id
export async function findOnePack(id, res) {
  try {
    const data = await PackageP.getPackById(id);

    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `Package with id ${id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message:
        err.message || "Some error occurred while retrieving the package.",
    });
  }
}

// Update a package identified by the id in the request
export async function updatePack(pack: pack, res) {
  try {
    const data = await PackageP.updatePackById(pack);

    if (data.length === 0) {
      res.status(404).json({
        success: true,
        message: `Package with id ${pack.id} not found.`,
      });
    } else {
      res.json({ success: true, data: data });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while updating the package.",
    });
  }
}

// Create a package
export async function createPack(pack: pack, res) {
  try {
    const data = await PackageP.createPack(pack);
    res.json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while creating the package.",
    });
  }
}

// Delete a package with the specified id in the request
export async function deletePack(id, res) {
  try {
    await PackageP.deletePackById(id);
    res.json({
      success: true,
      message: "Deleted package with id: " + id + ", successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while deleting the package.",
    });
  }
}

// Buy packages //
export async function buyPackages(client_id, packages, res) {
  try {
    const data = await PackageP.buyPackages(client_id, packages);
    res.json({ success: true, data: data });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Some error occurred while buying packages.",
    });
  }
}
