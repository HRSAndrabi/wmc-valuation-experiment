import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from firebase_admin import firestore
import secrets
import json

def initialise_app(path_to_service_key:str):
	"""
	A method to initialise the firebase app.

	Args:
		path_to_service_key (str): Service account key generated via
		project settings > service accounts > generate new private key
	"""
	cred = credentials.Certificate(path_to_service_key)
	firebase_admin.initialize_app(cred)

def create_user(email:str, password:str):
	"""
	Creates a new firebase authenticated user with specified email and
	password.

	Args:
		email (str): email address used to log in. This does not need to 
		be an actual working email address, as email verification is not 
		relied upon, and password resets can be conducted manually.
		password (str): Password for new user.

	Returns:
		user: instance of created user.
	"""
	user = auth.create_user(
		email="1000@cbmm.com",
		email_verified=True,
		password="password",
		display_name="Name",
		disabled=False
	)
	print(f"Created user for: {email} (ID: {user.uid})")
	return user

def create_participant(user):
	"""
	Creates a participant record in firestore, corresponding to 
	an input `user`. Each user should be associated with it's own
	participant record, to enable linked storage of results.

	Args:
		user: firebase auth user, via auth.create_user().

	Returns:
		participant: instance of created participant.
	"""
	participant = {
			"val_task_completed": False,
			"wmc_task_completed": False,
			"timestamp": firestore.SERVER_TIMESTAMP,
			"user": user.uid,
		}
	update_time, participant_ref = db.collection(u"participants").add(participant)
	print(f"Created corresponding record in firestore (ID: {participant_ref.id})")
	return participant_ref

def batch_register_participants(num_participants:int):
	"""
	A method to initialise firebase logins and database records
	for participants of an experiment. With the creation of each
	authenticated user, a corresponding document is created in
	the firestore 'participants' collection. Ensure the 'participants'
	collection exists in firestore before using this method. Login
	details are written to output files. 

	Args:
		num_participants (int): the number of user logins to create.
		This can exceed the total number of participants expected for 
		the experiment, as excess can be used as spares.
	"""
	participants = []
	for i in range(0, num_participants):
		email = f"{1000+i}@cbmm.com"
		password = "".join(secrets.choice(
			"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
		) for i in range(8))
		user = create_user(
			email=email,
			password=password,
		)
		participant = create_participant(
			user=user
		)
		participants.append({
			"id": user.uid,
			"email": email,
			"password": password,
		})
	output_path = "lib/firebaseAdmin/participant_logins.json"
	print(f"Login details written to: {output_path}")
	with open(output_path, "w", encoding="utf-8") as f:
		json.dump(participants, f, ensure_ascii=False, indent=4)
		

initialise_app(
	path_to_service_key="lib/firebaseAdmin/serviceAccountKey.json"
)
db = firestore.client()
batch_register_participants(
	num_participants=1,
)